import Observable from '@dojo/core/Observable';

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

export interface DiagnosticChannelMessage {
	source: string;
	eventId: string;
	info: DiagnosticsMessageInfo;
	ts: number;
}

export interface DiagnosticOutputChannel {
	broadcast(message: DiagnosticChannelMessage): void;
}

export interface DiagnosticInputChannel {
	listen(eventId?: string): Observable<DiagnosticChannelMessage>;
}
