const formatMemory = (m) => {
    const format = (d) => {return `${Math.round(d / 1024 / 1024 * 100) / 100} MB`}
    let data = {
        rss: format(m.rss),
        heapTotal: format(m.heapTotal),
        heapUsed: format(m.heapUsed),
        external: format(m.external),
        arrayBuffers: format(m.arrayBuffers)
    }
    return data
}

module.exports = formatMemory