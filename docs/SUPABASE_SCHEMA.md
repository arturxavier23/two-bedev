# Schema do Banco de Dados — Supabase

## Tabela: users
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | ID do auth.users |
| name | text | Nome do usuário |
| email | text | Email do usuário |
| created_at | timestamp | Data de criação |

## Tabela: progress
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | ID único |
| user_id | uuid | Referência ao users.id |
| total_xp | integer | XP total acumulado |
| completed_phases | integer[] | IDs das fases completadas |
| updated_at | timestamp | Última atualização |

## Segurança (RLS)
Row Level Security habilitado. Cada usuário só acessa seus próprios dados.