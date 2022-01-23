const Notes = function (selector, tuner) {
    this.tuner = tuner
    this.$root = document.querySelector(selector)
    this.$notesList = this.$root.querySelector('.notes-list')
    this.$frequency = this.$root.querySelector('.frequency')
    this.$notes = []
    this.$notesMap = {}
}

let lastUpdated = 0

Notes.prototype.update = function (note) {
    const time = new Date().getTime()
    const delta = 1000
    const frequency = parseFloat(
        note.frequency
    ).toFixed(1);

    if (time - delta <= lastUpdated || 50 > frequency || 600 < frequency) {
        return
    }

    lastUpdated = time
    this.$frequency.childNodes[0].textContent = frequency
}
