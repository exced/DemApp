#!/bin/bash

address:
	@read -p "Enter address : " address; \
	find ./Client -name "*.ts" -type f -exec sed -i "s/localhost:3000/$$address/g" {} \;