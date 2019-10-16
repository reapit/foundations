.PHONY: dep s3

profile ?= default
bucket ?= reapit-demo-site

dep:
	cd search-widget && yarn install

s3:
	aws --profile $(profile) s3 sync ./public s3://$(bucket) --delete --acl public-read
