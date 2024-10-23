import fs from 'fs/promises'
import path from 'path'

await fs.cp('src', 'build', {
    recursive: true,
    filter(src: string){
        return path.parse(src).ext !== '.ts'
    }
})
