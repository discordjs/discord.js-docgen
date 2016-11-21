const DocumentedItem = require('./item');
const DocumentedItemMeta = require('./item-meta');
const DocumentedVarType = require('./var-type');
const DocumentedParam = require('./param');

class DocumentedFunction extends DocumentedItem {
	registerMetaInfo(data) {
		data.meta = new DocumentedItemMeta(this, data.meta);
		if(data.returns) data.returns = new DocumentedVarType(this, data.returns[0].type);
		if(data.params && data.params.length > 0) {
			for(let i = 0; i < data.params.length; i++) data.params[i] = new DocumentedParam(this, data.params[i]);
		}
		this.directData = data;
	}

	serialize() {
		return {
			name: this.directData.name,
			description: this.directData.description,
			scope: this.directData.scope !== 'instance' ? this.directData.scope : undefined,
			access: this.directData.access,
			inherits: this.directData.inherits,
			inherited: this.directData.inherited,
			implements: this.directData.implements,
			examples: this.directData.examples,
			params: this.directData.params ? this.directData.params.map(p => p.serialize()) : undefined,
			returns: this.directData.returns ? this.directData.returns.serialize() : undefined,
			meta: this.directData.meta.serialize()
		};
	}
}

/*
{
  "id":"ClientUser#sendTTSMessage",
  "longname":"ClientUser#sendTTSMessage",
  "name":"sendTTSMessage",
  "scope":"instance",
  "kind":"function",
  "inherits":"User#sendTTSMessage",
  "inherited":true,
  "implements":[
    "TextBasedChannel#sendTTSMessage"
  ],
  "description":"Send a text-to-speech message to this channel",
  "memberof":"ClientUser",
  "params":[
    {
      "type":{
        "names":[
          "String"
        ]
      },
      "description":"the content to send",
      "name":"content"
    }
  ],
  "examples":[
    "// send a TTS message..."
  ],
  "returns":[
    {
      "type":{
        "names":[
          "Promise.<Message>"
        ]
      }
    }
  ],
  "meta":{
    "lineno":38,
    "filename":"TextBasedChannel.js",
    "path":src/structures/interface"
  },
  "order":293
}
*/

module.exports = DocumentedFunction;
