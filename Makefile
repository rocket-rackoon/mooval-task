#!make

MOOVAL_TASK_IMAGE = mooval
MOOVAL_TASK_COMPOSE = docker-compose -f docker-compose.yml

mooval-task-dev:
	@ $(MOOVAL_TASK_COMPOSE) up -d
	@ $(MOOVAL_TASK_COMPOSE) exec $(MOOVAL_TASK_IMAGE) bash
	@ $(MOOVAL_TASK_COMPOSE) stop
	@ $(MOOVAL_TASK_COMPOSE) down

mooval-task-start:
	@ $(MOOVAL_TASK_COMPOSE) up -d
	@ $(MOOVAL_TASK_COMPOSE) exec $(MOOVAL_TASK_IMAGE) yarn install || true
		@ $(MOOVAL_TASK_COMPOSE) exec $(MOOVAL_TASK_IMAGE) yarn build || true
	@ $(MOOVAL_TASK_COMPOSE) exec $(MOOVAL_TASK_IMAGE) yarn start || true
	@ $(MOOVAL_TASK_COMPOSE) stop
	@ $(MOOVAL_TASK_COMPOSE) down

mooval-task-test:
	@ $(MOOVAL_TASK_COMPOSE) up -d
	@ $(MOOVAL_TASK_COMPOSE) exec $(MOOVAL_TASK_IMAGE) yarn install || true
	@ $(MOOVAL_TASK_COMPOSE) exec $(MOOVAL_TASK_IMAGE) yarn test || true
	@ $(MOOVAL_TASK_COMPOSE) stop
	@ $(MOOVAL_TASK_COMPOSE) down

.PHONY: mooval-task \
mooval-task-start \
mooval-task-test