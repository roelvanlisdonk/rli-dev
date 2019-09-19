private readonly componentDestroyed$: Subject<boolean> = new Subject();
takeUntil(this.componentDestroyed$)
ngOnDestroy() {
this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
}
