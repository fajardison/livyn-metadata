import Metadata from '@livyn/metadata'
import Cache from '@velosjs/cache'


const cacheInstance = new Metadata.CacheStore({ max: 2000, ttl: 60_000 });
const store = new Metadata.MetaStore(cacheInstance)

class Product {}
const laptop = new Product()

console.log('=== TEST OVERWRITE ===')
// Define key pertama kali
store.define(laptop, 'brand', 'BrandA')
console.log('Brand awal:', store.get(laptop, 'brand')) // BrandA

// Coba define lagi tanpa overwrite (harus error)
try {
  store.define(laptop, 'brand', 'BrandB', { overwrite: false })
} catch (err) {
  console.log('Error overwrite false:', err.message)
}

// Define lagi dengan overwrite true (harus berhasil)
store.define(laptop, 'brand', 'BrandB', { overwrite: true })
console.log('Brand setelah overwrite:', store.get(laptop, 'brand')) // BrandB

console.log('\n=== TEST FREEZE ===')
// Define object dengan freeze true
store.define(laptop, 'specs', { cpu: 'Intel i7', ram: '16GB' }, { freeze: true })
const specs = store.get(laptop, 'specs')
console.log('Specs awal:', specs)

try {
  specs.cpu = 'AMD Ryzen'
} catch (err) {
  console.log('Error ubah frozen object:', err.message)
}
console.log('Specs setelah ubah percobaan:', store.get(laptop, 'specs'))

console.log('\n=== TEST MERGE ===')
// Define object baru dengan merge true
store.define(laptop, 'specs', { storage: '512GB SSD' }, { merge: true })
console.log('Specs setelah merge:', store.get(laptop, 'specs'))
// Hasilnya harus tetap ada cpu & ram, dan ditambah storage
process.exit(0)
