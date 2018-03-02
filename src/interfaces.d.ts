type DiagnosticsSimpleObject = string | number | boolean | Element | DiagnosticsMessageInfo;

export interface DiagnosticsMessageInfo {
	[key: string]: DiagnosticsSimpleObject | DiagnosticsSimpleObject[];
}

type WidgetIdentifier = number;

export interface BaseWidgetEvent {
	widgetId: WidgetIdentifier;
}

export interface RenderWidgetEvent extends BaseWidgetEvent {
	dnode: any;
}

export interface ProjectorAttachedEvent extends BaseWidgetEvent {
	attachPoint: string;
}

export interface DiagnosticEventTypes {
	'render.widget': RenderWidgetEvent;
	'invalidate.widget': BaseWidgetEvent;
	'projector.attached': ProjectorAttachedEvent;
}
