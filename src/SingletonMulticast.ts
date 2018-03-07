import Observable from '@dojo/core/Observable';
import { SubscriptionObserver } from '@dojo/shim/Observable';

export class SingletonMulticast<T> extends Observable<T> {
	private singleton: Observable<T> | null = null;
	private observers: SubscriptionObserver<T>[] = [];

	constructor(factory: () => Observable<T>) {
		super((subscriber) => {
			if (!this.singleton) {
				this.singleton = factory();

				this.singleton.subscribe({
					next: (value) => this.next(value),
					error: (error) => this.error(error),
					complete: (completeValue) => this.complete(completeValue)
				});
			}

			this.observers.push(subscriber);

			return () => {
				this.observers = this.observers.filter((observer) => observer !== subscriber);
			};
		});
	}

	private next(value: T) {
		this.observers.forEach((observer) => observer.next(value));
	}

	private error(value: any) {
		this.observers.forEach((observer) => observer.error(value));
	}

	private complete(value?: any) {
		this.observers.forEach((observer) => observer.complete(value));
	}
}
