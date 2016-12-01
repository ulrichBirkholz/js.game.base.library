/**
 * 
 */
var StringUtils = {
	isNotBlank : function (str) {
		return (ObjectUtils.hasValue(str)
				&& str !== '');
	},
	isBlank : function (str) {
		return !this.isNotBlank(str);
	}
}