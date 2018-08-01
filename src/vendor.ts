// import 'jquery';
import * as WebFont from 'webfontloader';
// import 'bootstrap/js/dist/collapse';
WebFont.load({
  google: {
    families: [
      'Source Sans Pro:300,400,600,700'
    ]
  }
});

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronLeft as fasChevronLeft
} from '@fortawesome/free-solid-svg-icons';
library.add(fasChevronLeft);
