---
title: Mediary
projectTags: ["JavaScript", "Flask", "Python", "REST API", "AWS"]
projectIndex: 7
description: An internal web app for video producers and editors at Paramount to launch, monitor, and manage workflow automations
thumbnail: https://s3.us-east-1.amazonaws.com/palomakop.tv/code/mediary.png
thumbnailAlt: Mediary logo
---

**Tools used:**
- JavaScript front-end
- RESTful API microservices built with [Flask](https://flask.palletsprojects.com/en/stable/)
- Custom integrations with external vendor APIs and enterprise software products:
  - [IBM Aspera Orchestrator](https://www.ibm.com/community/101/ibm-aspera-101/ibm-aspera-orchestrator/)
  - [AWS Elemental MediaConvert](https://aws.amazon.com/mediaconvert/)
  - [Rev Transcription and Caption API](https://www.rev.com/api)
  - [SyncWords API](https://www.syncwords.com/)
  - [3play Media API](https://www.3playmedia.com/services/features/for-developers/)
  - [Emotion Systems Engine](https://www.emotion-systems.com/products/engine/)
  - [TeleStream Vantage](https://www.telestream.com/vantage/) and [ContentAgent](https://www.telestream.net/ContentAgent/overview.htm)

**Highlights:**
- I built a custom Flask API that allowed Mediary users to interchangeably order captions from an array of vendor options
  - Each of our captioning vendors had their own unique API and configuration options. The universal caption API I built allowed a caption order to be placed to any of these vendors using a normalized payload
- I built an integration with AWS Elemental MediaConvert that allowed Mediary users to launch jobs to AWS's cloud-based media encoding service
  - Previously, all of our media encoding was done with on-premises hardware; this integration helped transiton the department's infrastructure dependencies to the cloud
- I developed a unified template for all workflows to follow, improving consistency and maintainability
- I also created detailed documentation for all the projects listed above
- My team oversaw the transition of the Mediary app and its users to fully remote, cloud-based workflows, allowing them to seamlessly continue their work at the start of the pandemic