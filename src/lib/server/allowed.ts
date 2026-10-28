// The only values the wizard can send. The API rejects anything else, so no free text reaches the model
// except the project title.
import { QUESTIONS } from '@/lib/questions';

export const ALLOWED: Record<string, Set<string>> = {};
for (const list of Object.values(QUESTIONS)) {
  for (const q of list) {
    const set = (ALLOWED[q.id] ??= new Set());
    for (const o of q.options) set.add(o.label);
  }
}
// "Not sure yet" is dropped by the client before sending, but accept it if present.
ALLOWED.technologies?.add('Not sure yet');
