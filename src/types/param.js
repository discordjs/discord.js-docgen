const DocumentedItem = require('./item');
const DocumentedVarType = require('./var-type');

/*
{
    "type":{
        "names":[
          "Guild"
        ]
      },
      "description":"the roles after the update",
      "name":"newRoles"
    }
*/

class DocumentedParam extends DocumentedItem {
	registerMetaInfo(data) {
		super.registerMetaInfo(data);
		this.directData = data;
		this.directData.type = new DocumentedVarType(this, data.type);
	}

	serialize() {
		super.serialize();
		const { name, description, type, optional, defaultvalue } = this.directData;
		return {
			name,
			description,
			optional,
			default: defaultvalue,
			type: type.serialize()
		};
	}
}

module.exports = DocumentedParam;
