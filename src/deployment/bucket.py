import boto3
from os import walk, path, getenv
from collections import namedtuple
from json import load
from mimetypes import guess_type
import gzip
import shutil
import sys
from time import sleep


def create_bucket(name):
    s3.create_bucket(Bucket=name)


def upload_file(location, key, bucket):
    s3.upload_file(location, bucket, key)


def get_project_version():
    with open('./package.json') as file:
        package_json = load(file)

        return package_json['version']


def find_objects():
    locator = []

    for (dir_path, _, file_names) in walk('./build/'):
        for file in file_names:
            mimetype, _ = guess_type(file)

            locator.append({
                'target': path.join(dir_path.replace('./', ''), file),
                'location': path.join(dir_path, file),
                'file': file,
                'mime': mimetype
            })

    return locator


def get_buckets():
    for bucket in response['Buckets']:
        print(bucket['Name'])


def upload(file, key, mime, bucket):
    # TODO: use env vars to specify aws acc & key.
    s3 = boto3.client('s3')
    response = s3.list_buckets()

    with open(file, 'rb') as f:
        res = s3.put_object(
            Bucket=bucket,
            Key=key,
            Body=f,
            ContentType=mime, ACL='public-read'
        )

        return res


def invalidate_cache(version, dist_id):
    ref = 'local-{}'.format(version)
    client = boto3.client('cloudfront')

    print('Invalidating cache: \t{} using reference id: {}'.format(dist_id, ref))

    response = client.create_invalidation(
        DistributionId=dist_id,
        InvalidationBatch={
            'Paths': {
                'Quantity': 1,
                'Items': [
                    '/*',
                ]
            },
            'CallerReference': ref
        }
    )

    return response


def create_archive(version):
    file = 'build-{}'.format(version)
    location = './build/{}'.format(file)

    shutil.make_archive(location, 'gztar', './build')
    target = 'archive/{}'.format(file) + '.tar.gz'
    mimetype, _ = guess_type(target)

    return {
        'target': target,
        'file': file + '.tar.gz',
        'location': location + '.tar.gz',
        'mime': mimetype
    }


def main():
    objects = find_objects()
    version = get_project_version()
    bucket = '<bucket-name>'

    print('Using s3 bucket: \t{}'.format(bucket))

    if getenv('DEPLOY_ARCHIVE') is not None:
        archive = create_archive(version)

        print(
            'Archiving deployment:\t{location} => {target} '.format_map(archive))
        # Save a backup of current build.
        upload(
            archive.get('location'),
            archive.get('target'),
            archive.get('mime'),
            bucket
        )

    # Upload the new build
    file_count = len(objects)

    for i, obj in enumerate(objects):
        upload(obj.get('location'), obj.get('target'), obj.get('mime'), bucket)

        progress = ((i + 1) / file_count) * 100
        sys.stdout.write("\rUploading files:\t%d%%" % round(progress))
        sys.stdout.flush()

    print()

    # Clear cache
    res = invalidate_cache(version, getenv('AWS_CACHE'))


if __name__ == '__main__':
    main()
