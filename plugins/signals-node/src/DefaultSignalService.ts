/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { EventBroker } from '@backstage/plugin-events-node';
import { SignalPayload, SignalServiceOptions } from './types';
import { SignalService } from './SignalService';
import { JsonObject } from '@backstage/types';

/** @public */
export class DefaultSignalService implements SignalService {
  // TODO: Remove this to be optional when events-backend has eventBroker as service
  private eventBroker?: EventBroker;

  static create(options: SignalServiceOptions) {
    return new DefaultSignalService(options);
  }

  private constructor(options: SignalServiceOptions) {
    ({ eventBroker: this.eventBroker } = options);
  }

  /**
   * Publishes a signal to user refs to specific topic
   * @param signal - Signal to publish
   */
  async publish<TMessage extends JsonObject = JsonObject>(
    signal: SignalPayload<TMessage>,
  ) {
    await this.eventBroker?.publish({
      topic: 'signals',
      eventPayload: signal,
    });
  }
}
