var Bitcore_ = {
  bery: require('berycore-lib'),
  bch: require('bitcore-lib-cash')
};

var _ = require('lodash');

function AddressTranslator() {
};


AddressTranslator.getAddressCoin = function(address) {
  try {
    new Bitcore_['bery'].Address(address);
    return 'bery';
  } catch (e) {
    try {
      new Bitcore_['bch'].Address(address);
      return 'bch';
    } catch (e) {
      return;
    }
  }
};

AddressTranslator.translate = function(addresses, coin, origCoin) {
  var wasArray = true;
  if (!_.isArray(addresses)) {
    wasArray = false;
    addresses = [addresses];
  }
  origCoin = origCoin || AddressTranslator.getAddressCoin(addresses[0]);
  var ret =  _.map(addresses, function(x) {
    var orig = new Bitcore_[origCoin].Address(x).toObject();
    return Bitcore_[coin].Address.fromObject(orig).toString();
  });

  if (wasArray) 
    return ret;
  else 
    return ret[0];

};

AddressTranslator.translateInput = function(addresses) {
  return this.translate(addresses, 'bery', 'bch');
}

AddressTranslator.translateOutput = function(addresses) {
  return this.translate(addresses, 'bch', 'bery');
}




module.exports = AddressTranslator;
