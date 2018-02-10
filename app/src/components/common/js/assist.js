export const backBottom = (durations, dom, scrollHeight, callback = undefined) => {
    const scrollTop = dom.scrollTop
    for (var i = 0; i <= 60; i++) {
        setTimeout((i => {
            return () => {
                dom.scrollTop = scrollTop + scrollHeight * i / 60
                if (i === 0 && typeof callback === 'function') {
                    callback()
                }
            }
        })(i), durations * (i / 60))
    }
}