import {expectType} from 'tsd';
import ipRegex = require('.');

const options: ipRegex.Options = {};
expectType<RegExp>(ipRegex());
expectType<RegExp>(ipRegex({exact: true}));
expectType<RegExp>(ipRegex({includeBoundaries: true}));
expectType<RegExp>(ipRegex.v4());
expectType<RegExp>(ipRegex.v4({exact: true}));
expectType<RegExp>(ipRegex.v4({includeBoundaries: true}));
expectType<RegExp>(ipRegex.v6());
expectType<RegExp>(ipRegex.v6({exact: true}));
expectType<RegExp>(ipRegex.v6({includeBoundaries: true}));
