// db.ts

let request: IDBOpenDBRequest
let db: IDBDatabase
let version = 1

export interface User {
  id: string
  name: string
  email: string
}

export enum Stores {
  PdfInfo = 'PdfInfo',
  PdfData2 = 'PdfData2',
  PdfData = 'PdfData'
}

export const initDB = (): Promise<boolean> => {
  return new Promise(resolve => {
    // open the connection
    request = indexedDB.open('myDB')

    request.onupgradeneeded = () => {
      db = request.result(
        // if the data object store doesn't exist, create it
        'db.objectStoreNames.contains(Stores.PdfInfo) : ',
        db.objectStoreNames.contains(Stores.PdfInfo)
      )

      if (!db.objectStoreNames.contains(Stores.PdfInfo)) {
        ;('Creating PdfInfo store')
        db.createObjectStore(Stores.PdfInfo, { keyPath: 'id' })
      }

      if (!db.objectStoreNames.contains(Stores.PdfData)) {
        ;('Creating PdfData store')
        db.createObjectStore(Stores.PdfData, { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains(Stores.PdfData2)) {
        ;('Creating PdfData store')
        db.createObjectStore(Stores.PdfData2, { keyPath: 'id' })
      }

      // no need to resolve here
    }

    request.onsuccess = (event: any) => {
      'request.onsuccess - initDB', version
      db = event.target.result
      version = db.version
      resolve(true)
    }
    request.onerror = () => {
      resolve(false)
    }
  })
}

export const addData = <T>(storeName: string, data: T): Promise<T | string | null> => {
  return new Promise(resolve => {
    request = indexedDB.open('myDB', version)

    request.onsuccess = (event: any) => {
      'request.onsuccess - addData', data
      db = event.target.result
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)
      store.add(data)
      resolve(data)
    }

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error)
      } else {
        resolve('Unknown error')
      }
    }
  })
}

export const getStoreData = <T>(storeName: Stores): Promise<T[]> => {
  return new Promise(resolve => {
    request = indexedDB.open('myDB')

    request.onsuccess = (event: any) => {
      ;('request.onsuccess - getAllData')
      db = event.target.result
      const tx = db.transaction(storeName, 'readonly')
      const store = tx.objectStore(storeName)
      const res = store.getAll()
      res.onsuccess = () => {
        resolve(res.result)
      }
    }
  })
}
export const deleteData = (storeName: string, key: string): Promise<boolean> => {
  return new Promise(resolve => {
    // again open the connection
    request = indexedDB.open('myDB', version)
    request.onsuccess = (event: any) => {
      'request.onsuccess - deleteData', key
      db = event.target.result
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)
      const res = store.delete(Number(key))

      // add listeners that will resolve the Promise
      res.onsuccess = () => {
        resolve(true)
      }
      res.onerror = () => {
        resolve(false)
      }
    }
  })
}
export const updateDataById = (storeName: string, key: number, data: any) => {
  const objectStore = db.transaction(storeName, 'readwrite').objectStore(storeName)

  const request = objectStore.get(key)

  request.onsuccess = () => {
    // Create a request to update
    const updateRequest = objectStore.put(data)

    updateRequest.onsuccess = () => {
      ;`Estudent updated, email: ${updateRequest.result}`
    }
  }
}
