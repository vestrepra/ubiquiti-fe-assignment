# Context

## Home Task

Imagine that you are a developer at Ubiquiti, Inc. and your product manager has
asked you to help another team - to kick-start a project and put it in good shape
for that other team to take over.

Your product manager has shared the context: multiple teams need a shared
internal productivity tool to help developers, designers, PM’s and other roles to
discover, verify, share and align on insights about Ubiquit’s products and their
images to visualize the product database [UIDB](https://static.ui.com/fingerprint/ui/public.json) which is used by many systems.

The designers have defined the UX and UI for all the features that the teams were
asking for – Figma file in the attachments. But they have not negotiated the
design with you. Feel free to alter things if you have good reasons.

Currently these are the key fields in UIDB:

- `id` - primary key
- `line` - what you use for Filters
- `product.name` - human readable name
- `shortnames` - multiple lookup keys as used by various systems and their versions
- `images.default` - used for image urls

Image urls can be built using:
`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${id}%2Fdefault%2${images.default}.png&w=${size}&q=75`

For an example see:
[https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2Fed67d43e-2d5c-4928-ace8-edf984baeff1%2Fdefault%2F977c1f8c477549aeb7238727fd4ecc62.png&w=640&q=75](https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2Fed67d43e-2d5c-4928-ace8-edf984baeff1%2Fdefault%2F977c1f8c477549aeb7238727fd4ecc62.png&w=640&q=75)

The UIDB team is not guaranteeing the schema won't change tomorrow. Your
product manager asks you to expect the unexpected and fail gracefully.

React and Typescript are requirements, but the other teams will adopt potential
additional choices.

You don’t know the other team and have no ability to talk to them. Whatever you
hand over has to be in the git repository.

Product managers and designers will not be able to run your code just to see
what you have built. Deploy your latest version somewhere online.
