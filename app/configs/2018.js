/* global angular */
if (typeof module === 'object' && typeof exports !== 'undefined') {
  var Config = {licence: {}, functions: {}}
}

/**
 * Order to display score enterers in
 * @type {Object}
 */
Config.Order = {
  a: {
    mob: {
      desc: 'Music on the beat',
      weight: {
        sr: 0.5,
        dd: 0.5
      }
    },
    uom: {
      desc: 'Using the Music',
      weight: {
        sr: 0.5,
        dd: 0.5
      }
    },
    mov: {
      desc: 'Movement',
      weight: {
        sr: 0.5,
        dd: 0.5
      }
    },
    fbe: {
      desc: 'Form of Body & Execution',
      weight: {
        sr: 1,
        dd: 1
      }
    },
    ori: {
      desc: 'Originality',
      weight: {
        sr: 1,
        dd: 1
      }
    },
    imp: {
      desc: 'Overall Impression and Entertainment value',
      weight: {
        sr: 0.5,
        dd: 0.5
      }
    }
  },
  b: {
    dd: {
      tis: {
        desc: 'Amount of different <b>Turner Involvement Skills</b>',
        max: 8
      },
      swi: {
        desc: 'Amount of different <b>Turner / Jumper Switches</b>',
        max: 5
      },
      nae: {
        desc: 'Amount of <b>Gymnastics that are <em>NOT</em> aerials</b>',
        max: 2
      },
      aer: {
        desc: 'Amount of <b>Gymnastics that are aerials</b>',
        max: 3
      },
      spd: {
        desc: '<b>Speed Dances</b>',
        max: 2
      },
      rel: {
        desc: '<b>Release</b>',
        max: 1
      },
      jis: {
        desc: 'Amount of <b>Jumper Interactions</b>',
        max: 2,
        events: ['ddpf']
      }
    },
    sr: {
      mul: {
        desc: 'Amount of separate <b>sets of at least 4 different triple Multiples</b>',
        max: 3
      },
      gym: {
        desc: 'Amount of different <b>Gymnastics</b>',
        max: 3
      },
      pow: {
        desc: 'Amount of different <b>Power Skills</b>',
        max: 3
      },
      spd: {
        desc: 'Amount of different <b>Speed Dances</b>',
        max: 3
      },
      rel: {
        desc: 'Amount of different <b>Releases</b>',
        max: 3
      },
      wra: {
        desc: 'Amount of different <b>Wraps</b>',
        max: 3
      },
      pai: {
        desc: 'Amount separate <b>Pair Interactions</b>',
        max: 3,
        events: ['srtf', 'srpf']
      }
    }
  },
  d: true,
  h: true
}

if (typeof module === 'object' && typeof exports !== 'undefined') {
  module.exports = Config.licence.dateTo
} else if (typeof angular === 'object') {
  angular.element(document.querySelector('html')).scope().reload()
}