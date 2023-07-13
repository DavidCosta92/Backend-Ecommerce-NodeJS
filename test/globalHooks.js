import mongoose from 'mongoose'
import { MONGOOSE_STRING_ATLAS_TEST } from '../src/config/config.js'

export const mochaHooks = {

  async beforeAll() {
    await mongoose.connect(MONGOOSE_STRING_ATLAS_TEST)
    // await Promise => ver como levantar el servidor desde aca... en repo rpofe esta, (debo actualizarlo al repo antes!)
  },

  async afterEach(){
      await mongoose.connection.collection('testproducts').deleteMany({})
  },

  async afterAll() {
    await mongoose.connection.close()
    // await Promise => ver como cerrar el servidor desde aca... en repo rpofe esta, (debo actualizarlo al repo antes!)
  }

} 