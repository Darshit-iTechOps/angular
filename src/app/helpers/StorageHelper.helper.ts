export class StorageHelper {
  // SET Section
  public SetToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public SetID(id: number): void {
    localStorage.setItem('id', id.toString());
  }

  public SetRole(role: string): void {
    localStorage.setItem('role', role);
  }

  public SetLoggedIn(value: boolean): void {
    localStorage.setItem('loggedIn', value.toString());
  }

  // -----------------------------------

  // GET Section
  public GetToken(): string {
    return localStorage.getItem('token')!;
  }

  public GetID(): number {
    return Number(localStorage.getItem('id')!);
  }

  public GetRole(): string {
    return localStorage.getItem('role')!;
  }

  public GetLoggedIn(): boolean {
    return Boolean(localStorage.getItem('loggedIn')!);
  }

  // ---------------------------

  // Clear Storage Section

  public ClearStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('loggedIn');
  }
}
