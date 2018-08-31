export interface Config {
  onInit: (db: DB) => any
}

class DB {
  public db: IDBDatabase
  private indxDb: IDBFactory

  constructor(config: Config) {
    this.indxDb = window.indexedDB
    this.open(config)
  }

  open(config: Config) {
    const req = this.indxDb.open('local-app', 1)

    req.onupgradeneeded = event => {
      this.db = req.result

      this.db.createObjectStore('auth')
    }

    req.onsuccess = (e: any) => {
      this.db = req.result

      config.onInit(this)
    }

    req.onerror = event => {
      console.error(event)
    }
  }

  get<Model>(store: string, key: string): Promise<Model> {
    return new Promise((resolve, reject) => {
      const tx = this.db
        .transaction(store)
        .objectStore(store)
        .get(key)

      tx.onsuccess = _ => resolve(tx.result)
      tx.onerror = event => reject(event)
    })
  }

  post<Model>(store: string, key: string, value: Model): Promise<Model> {
    return new Promise((resolve, reject) => {
      const tx = this.db
        .transaction(store, 'readwrite')
        .objectStore(store)
        .add(value, key)

      tx.onsuccess = _ => resolve(value)
      tx.onerror = error => reject(error)
    })
  }

  put<Model>(store: string, key: string, value: Model) {
    return new Promise((resolve, reject) => {
      const tx = this.db
        .transaction(store, 'readwrite')
        .objectStore(store)
        .put(value, 'token')

      tx.onsuccess = _ => resolve(value)
      tx.onerror = error => reject(error)
    })
  }

  delete() {
    const req = this.indxDb.deleteDatabase(this.db.name)

    req.onerror = e => console.log(e)
    req.onsuccess = e => console.log(e)
  }

  transaction<schema>(
    store: string,
    mode: 'readonly' | 'readwrite',
    data?: schema
  ) {
    const tx = this.db.transaction([store], mode)
    const objStore = tx.objectStore(store)

    tx.oncomplete = event => {
      console.log('done', event)
    }

    tx.onerror = event => {
      console.log('tx error', event)
    }

    const req = objStore.add(data, 'token')

    req.onsuccess = event => {
      console.log(event)
    }
  }
}

export default DB
