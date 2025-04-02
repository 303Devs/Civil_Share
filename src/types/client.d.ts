interface Client extends Readonly<ClientOptions> {
  readonly clientId: string;
  readonly secretKey?: string;
}
