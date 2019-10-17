#!/bin/sh
aws s3 cp ./estimate.html s3://75mm.studio --acl public-read --profile 75mm.studio
aws s3 cp ./js/estimate.js s3://75mm.studio/js/ --acl public-read --profile 75mm.studio
aws s3 cp ./css/estimate.css s3://75mm.studio/css/ --acl public-read --profile 75mm.studio
aws s3 cp ./img/estimateicon.png s3://75mm.studio/img/ --acl public-read --profile 75mm.studio

aws s3 cp ./estimate_eng.html s3://75mm.studio --acl public-read --profile 75mm.studio
aws s3 cp ./js/estimate_eng.js s3://75mm.studio/js/ --acl public-read --profile 75mm.studio

aws s3 cp ./estimate_kor.html s3://75mm.studio --acl public-read --profile 75mm.studio
aws s3 cp ./js/estimate_kor.js s3://75mm.studio/js/ --acl public-read --profile 75mm.studio
