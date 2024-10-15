import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
/**@type {import('vite').UserConfig}*/
export default ({ command, mode }:any) => {
  // console.log('command:', command, 'mode:', mode);
  // console.log(loadEnv(mode, process.cwd()));
  
  return defineConfig({
    plugins: [vue()],
    server: {
      port:Number(loadEnv(mode, process.cwd()).VITE_PORT)
    },
    css:{
      preprocessorOptions:{
        scss:{
          api:'modern-compiler'
        }
      }
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  })
}

