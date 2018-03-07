import Observable from '@dojo/core/Observable';
import { DiagnosticChannelMessage } from '../../interfaces';
import { SingletonMulticast } from '../../SingletonMulticast';
import { BaseInputChannel } from '../BaseInputChannel';

declare const chrome: any;

export class ChromeExtensionInputChannel extends BaseInputChannel {
	observable = new SingletonMulticast<DiagnosticChannelMessage>(() => {
		return new Observable((subscriber) => {
			const backgroundPort = chrome.runtime.connect({
				name: 'diagnostics'
			});

			backgroundPort.onMessage.addListener((message: any) => {
				subscriber.next(message);
			});

			backgroundPort.postMessage({
				type: 'register',
				tabId: chrome.devtools.inspectedWindow.tabId
			});
		});
	});

	observe(): Observable<DiagnosticChannelMessage> {
		return this.observable;
	}
}
