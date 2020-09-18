import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'

//Parts
import draftHatgore from './hatgore'
import draftHatbrim from './hatbrim'
import draftBrimv2 from './brimv2'


// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Pattern.prototype.draftHatgore = draftHatgore
Pattern.prototype.draftHatbrim = draftHatbrim
Pattern.prototype.draftBrimv2 = draftBrimv2

// okay, this part seems to add the brim okay

export default Pattern
