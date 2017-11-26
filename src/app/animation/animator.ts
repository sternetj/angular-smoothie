export interface Animator {
  elementId: number;
  elementAddedBefore: (added: number, current: number) => any;
  elementAddedAfter: (added: number, current: number) => any;
  elementRemovedBefore: (removed: number, current: number) => any;
  elementRemvoedAfter: (added: number, current: number) => any;
}
