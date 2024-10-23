import { PRIORITY_LOW } from '@/scripts/filters/_defs'

import fm from 'hexo-front-matter'
import fs from "hexo-fs";
import {useConfig} from "@/scripts/_helpers/configs";

function isEnabled(): boolean {
    const config = useConfig().theme.abbrlink
    return config && config.enable
}

function hash(...args: any[]): string {
    const config = useConfig().theme.abbrlink

    const exp = Math.max(Math.min(config.length || 0, 7), 5)
    const m = Math.pow(10, exp)

    let code = 0
    for (const arg of args) {
        const str = `${arg}`

        for (let i = 0; i < str.length; i++) {
            code = (code * 31 + str.charCodeAt(i)) % m
        }

        code = code * 61 % m
    }

    const links: Set<string> = hexo.locals.get('abbrlinks')
    const str = `${code}`.padStart(2, '0')

    if (links.has(str)) {
        return hash(...args, str)
    }

    return str
}

hexo.on('generateBefore', () => {
    if (!isEnabled()) {
        return
    }

    const links = new Set<string>()

    hexo.locals.get('posts').each((data: any) => {
        const front = fm.parse(data.raw)
        if (front.abbrlink) {
            const link = front.abbrlink as string;
            links.add(link)
        }
    })

    hexo.locals.set('abbrlinks', links)
})

hexo.extend.filter.register('before_post_render', function(data) {
    if (!isEnabled()) {
        return
    }

    // 跳过已有 abbrlink 的文章和非 post 页面
    if (data.abbrlink || data.layout !== 'post') return

    const front = fm.parse(data.raw)
    const abbrlink = hash(front.title)

    front.abbrlink = abbrlink
    data.abbrlink = abbrlink

    fs.writeFileSync(data.full_source, '---\n' + fm.stringify(front), 'utf-8')

    hexo.log.info(`Generated abbrlink ${abbrlink} for post \`${data.source}\``)
}, PRIORITY_LOW)
