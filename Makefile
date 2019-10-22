.PHONY: dep s3

profile ?= default
bucket ?= reapit-demo-site

dep:
	yarn install

s3:
	aws --profile $(profile) s3 sync ./build s3://$(bucket) --delete --acl public-read
