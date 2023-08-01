'use strict'
const getUserCode = require('../../handler/user-code');

module.exports = async function(fastify, opts) {
    fastify.route({
        method: 'POST',
        url: '/user-code',
        handler: getUserCode,
        schema: {
            summary: 'Return to user photo upload page',
            description: `Return to user photo upload page and check the customer's eligibility`,
            tags: ['User'],
            body: {
                type: 'object',
                description: 'payload',
                properties: {
                    user_code: {
                        type: 'string',
                        description: `the user code. Example: 'VK5L6'`
                    }
                }
            },
            response: {
                200: {
                    type: 'string',
                    example: `<!DOCTYPEhtml><htmllang="en"><head><metacharset="UTF-8"><title>VoucherSystemGenerator</title><!--CSS(loadbootstrapfromaCDN)--><linkrel="stylesheet"href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css"><style>body{padding-top:50px;}</style></head><bodyclass="container"><header><navclass="navbarnavbar-expand-lgnavbar-lightbg-light"><aclass="navbar-brand"href="/home">VoucherSystemGenerator</a><ulclass="navbar-navmr-auto"><liclass="nav-item"><aclass="nav-link"href="/home">Home</a></li></ul></nav></header><main><formaction="/photo/upload-photo?user_code=YXSEK"method="post"enctype="multipart/form-data"><divclass="form-group"><labelfor="exampleInputPhoto">Photo</label><inputtype="file"id="fileField"name="photo"(change)="handleFileInput($event.target.files)"><labelfor="exampleInputUserCode">Usercode</label><inputtype="text"name="user_code"value="YXSEK"disabled></div><buttonid="buttonClick"type="submit"class="btnbtn-primarymb-2">PostNow</button></form></main><footer></footer></body></html>`
                }
            }
        }
    });
}