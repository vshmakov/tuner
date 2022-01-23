const Notes = function (selector, tuner) {
    this.tuner = tuner
    this.$root = document.querySelector(selector)
    this.$notesList = this.$root.querySelector('.notes-list')
    this.$frequency = this.$root.querySelector('.frequency')
    this.$notes = []
    this.$notesMap = {}
}

Notes.prototype.update = function (note) {
    this.$frequency.childNodes[0].textContent = parseFloat(
        note.frequency
    ).toFixed(1)
}
