const Notes = function (selector, tuner) {
    this.tuner = tuner
    this.isAutoMode = true
    this.$root = document.querySelector(selector)
    this.$notesList = this.$root.querySelector('.notes-list')
    this.$frequency = this.$root.querySelector('.frequency')
    this.$notes = []
    this.$notesMap = {}
}

Notes.prototype.active = function ($note) {
    this.clearActive()
    $note.classList.add('active')
    this.$notesList.scrollLeft =
        $note.offsetLeft - (this.$notesList.clientWidth - $note.clientWidth) / 2
}

Notes.prototype.clearActive = function () {
    const $active = this.$notesList.querySelector('.active')
    if ($active) {
        $active.classList.remove('active')
    }
}

Notes.prototype.update = function (note) {
    this.$frequency.childNodes[0].textContent = parseFloat(
        note.frequency
    ).toFixed(1)
}

Notes.prototype.toggleAutoMode = function () {
    if (this.isAutoMode) {
        this.clearActive()
    }
    this.isAutoMode = !this.isAutoMode
}
