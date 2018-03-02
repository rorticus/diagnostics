export function xpathForElement(element: Node) {
	let el = element;
	let xml = document;

	let xpath = '';
	let pos, tempitem2;

	while (el !== xml.documentElement) {
		pos = 0;
		tempitem2 = el;
		while (tempitem2) {
			if (tempitem2.nodeType === 1 && tempitem2.nodeName === el.nodeName) { // If it is ELEMENT_NODE of the same name
				pos += 1;
			}
			tempitem2 = tempitem2.previousSibling;
		}

		xpath = el.nodeName + '[' + pos + ']' + '/' + xpath;

		el = el.parentNode!;
	}
	xpath = '/' + xml.documentElement.nodeName + '/' + xpath;
	xpath = xpath.replace(/\/$/, '');
	return xpath;
}

export function convertDNode(dNode: any) {
	if (typeof dNode === 'string' || !dNode) {
		return dNode;
	}

	const ret: any = {};

	if (dNode.tag) {
		// is a vnode
		ret.tag = dNode.tag;
		if (dNode.domNode) {
			ret.node = xpathForElement(dNode.domNode);
		}
	}
	else if (dNode.text) {
		// text node
		ret.text = dNode.text;
	}
	else {
		// is a wnode
		ret.widgetConstructor = dNode.widgetConstructor.name;
		ret.properties = JSON.parse(JSON.stringify(dNode.properties));
	}

	if (dNode.children) {
		ret.children = dNode.children.map((child: any) => convertDNode(child));
	}

	if (dNode.rendered) {
		ret.children = dNode.rendered.map((child: any) => convertDNode(child));
	}

	return ret;
}
