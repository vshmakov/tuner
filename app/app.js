const Application = function () {
    this.initA4()
    this.tuner = new Tuner(this.a4)
    this.notes = new Notes('.notes')
    this.meter = new Meter('.meter')
    this.frequencyBars = new FrequencyBars('.frequency-bars')
    this.update({name: 'A', frequency: this.a4, octave: 4, value: 69, cents: 0})
}

Application.prototype.initA4 = function () {
    this.a4 = parseInt(localStorage.getItem('a4')) || 440
}

Application.prototype.start = function () {
    const self = this

    this.tuner.onNoteDetected = function (note) {
        self.update(note)
    }

    swal.fire('Welcome online tuner!').then(function () {
        self.tuner.init()
        self.frequencyData = new Uint8Array(self.tuner.analyser.frequencyBinCount)
    })

    this.updateFrequencyBars()
}

Application.prototype.updateFrequencyBars = function () {
    if (this.tuner.analyser) {
        this.tuner.analyser.getByteFrequencyData(this.frequencyData)
        this.frequencyBars.update(this.frequencyData)
    }
    requestAnimationFrame(this.updateFrequencyBars.bind(this))
}

Application.prototype.update = function (note) {
    this.notes.update(note)
    this.meter.update((note.cents / 50) * 45)
}

// noinspection JSUnusedGlobalSymbols
Application.prototype.toggleAutoMode = function () {
    this.notes.toggleAutoMode()
}

const app = new Application()
app.start()
