import Metadata from '@livyn/metadata'

const cacheInstance = new Metadata.CacheStore({ max: 2000, ttl: 60_000 });
const store = new Metadata.MetaStore(cacheInstance)


class Product {}
const laptop = new Product()

// Define metadata dengan TTL dan opsi per key
store.define(laptop, 'name', 'Laptop', { ttl: 10_000 })
store.define(laptop, 'specs.cpu', 'Intel i7', { ttl: 5000, overwrite: true })
store.define(laptop, 'specs.ram', '16GB', { freeze: true })

console.log('=== Awal ===')
console.log('Name:', store.get(laptop, 'name'))        // Laptop
console.log('CPU:', store.get(laptop, 'specs.cpu'))   // Intel i7
console.log('RAM:', store.get(laptop, 'specs.ram'))   // 16GB
console.log('Has specs.cpu:', store.has(laptop, 'specs.cpu')) // true

console.log('All metadata:', store.getAll())
console.log('All as array:', store.getAllAsArray())
console.log('Find by key "cpu":', store.findByKey('cpu', { exact: true }))
console.log('Find by value includes "Intel":', store.findByValue(v => typeof v === 'string' && v.includes('Intel')))
console.log('Debug:', store.debug())

setTimeout(() => {
  console.log('\n=== Setelah 6 detik ===')
  console.log('CPU:', store.get(laptop, 'specs.cpu'))   // undefined karena TTL 5 detik
  console.log('RAM:', store.get(laptop, 'specs.ram'))   // tetap ada 16GB

  process.exit(0)
}, 6000)
            
