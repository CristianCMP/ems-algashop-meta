# ems-algashop-meta

## Flyway
### Verificar o estado das migrações: 
`./gradlew flywayInfo -Dflyway.configFiles=flyway.conf`

### Build + listar migrações (ignorando testes):
`./gradlew -x check build flywayInfo -Dflyway.configFiles=flyway.conf`

### Validar migrações:
`./gradlew -x check build flywayValidate -Dflyway.configFiles=flyway.conf`

### Executar migrações pendentes:
`./gradlew -x check build flywayMigrate -Dflyway.configFiles=flyway.conf`