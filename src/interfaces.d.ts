type DiagnosticsSimpleObject = string | number | DiagnosticsMessageInfo;

export interface DiagnosticsMessageInfo {
	[key: string]: DiagnosticsSimpleObject | DiagnosticsSimpleObject[];
}

type WidgetIdentifier = number;

export interface BaseWidgetEvent {
	widgetId: WidgetIdentifier;
}

export interface RenderWidgetEvent extends BaseWidgetEvent {
	vdom: any;
}

export interface DiagnosticEventTypes {
	'render.widget': RenderWidgetEvent;
	'invalidate.widget': BaseWidgetEvent;
}
