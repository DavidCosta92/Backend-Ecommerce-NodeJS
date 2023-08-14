import mongoose from 'mongoose'
import { MONGOOSE_STRING_ATLAS_TEST } from '../src/config/config.js'

export const mochaHooks = {
  async beforeAll() {
    await mongoose.connect(MONGOOSE_STRING_ATLAS_TEST)
  },
  async afterEach(){
    await mongoose.connection.collection('products').deleteMany({}) 
    await mongoose.connection.collection('testproducts').deleteMany({})
    await mongoose.connection.collection('users').deleteMany({})
    await mongoose.connection.collection('tickets').deleteMany({})
  },
  async afterAll() {
    await mongoose.connection.collection('carts').deleteMany({})
    await mongoose.connection.close()  }
} 