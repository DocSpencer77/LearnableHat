import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'

//Parts
//import draftHatbrim from './hatbrim'
import draftCircleCrown from './circleCrown'
import draftHatSide from './hatSide'


// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
//Pattern.prototype.draftHatgore = draftHatgore
Pattern.prototype.draftCircleCrown = draftCircleCrown
Pattern.prototype.draftHatSide = draftHatSide

// okay, this part seems to add the brim okay

export default Pattern
