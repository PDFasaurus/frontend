import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/php/php';
import 'codemirror/mode/shell/shell';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../admin.service';
import { CookieService } from '../../cookie.service';
import { AUTH_COOKIE, PAGE_SIZE, ERRORS } from '../../constants';
import * as moment from 'moment';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css'],
  providers: [AdminService, CookieService],
})
export class KeysComponent implements OnInit {
  key = "";
  error: string;
  active = 1;
  curl;
  javascript;
  php;
  ruby;
  csharp;
  java;
  smoke;

  constructor(
    private modalService: NgbModal,
    private adminService: AdminService,
    private cookieService: CookieService,
    private routerService: ActivatedRoute,
    private router: Router,
  ) { }

  generateCode() {
    this.curl = `
  # Stream
  curl --location --request POST 'https://api.pdfasaurus.com/dino/TEMPLATE_ID' \\
  --header 'Authorization: ${this.key}' \\
  --header 'Content-Type: application/json' \\
  --data-raw '{"name": "Mr. T. Rex"}'

  # Base64
  curl --location --request POST 'https://api.pdfasaurus.com/dino/TEMPLATE_ID/base64' \\
  --header 'Authorization: ${this.key}' \\
  --header 'Content-Type: application/json' \\
  --data-raw '{"name": "Mr. T. Rex"}'

  # Buffer
  curl --location --request POST 'https://api.pdfasaurus.com/dino/TEMPLATE_ID/buffer' \\
  --header 'Authorization: ${this.key}' \\
  --header 'Content-Type: application/json' \\
  --data-raw '{"name": "Mr. T. Rex"}'
    `;
    this.javascript = `
  // Stream
  const pdf = await axios({
    method: 'POST',
    url: 'https://api.pdfasaurus.com/dino/TEMPLATE_ID',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '${this.key}',
    },
    responseType: 'stream',
    data: {
      name: 'Mr. T. Rex'
    }
  })

  pdf.data.pipe(fs.createWriteStream('sample.pdf'))

  // Buffer
  const pdf = await axios({
    method: 'POST',
    url: 'https://api.pdfasaurus.com/dino/TEMPLATE_ID/base64',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '${this.key}',
    },
    responseType: 'arraybuffer',
    data: {
      name: 'Mr. T. Rex'
    }
  })

  fs.writeFileSync('sample.pdf', pdf.data)

  // Base64
  const { base64 } = await axios({
    method: 'POST',
    url: 'https://api.pdfasaurus.com/dino/TEMPLATE_ID/buffer',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '${this.key}',
    },
    data: {
      name: 'Mr. T. Rex'
    }
  })

    `;
    this.php = `
  <?
  $curl = curl_init();

  curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.pdfasaurus.com/dino/TEMPLATE_ID",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS =>"{\"name\": \"Mr. T. Rex\"}",
    CURLOPT_HTTPHEADER => array(
      "Authorization: ${this.key}",
      "Content-Type: application/json"
    ),
  ));

  $response = curl_exec($curl);

  curl_close($curl);
  echo $response;
  ?>
    `;
    this.ruby = `
  require "uri"
  require "net/http"

  url = URI("https://api.pdfasaurus.com/dino/TEMPLATE_ID")

  https = Net::HTTP.new(url.host, url.port);
  https.use_ssl = true

  request = Net::HTTP::Post.new(url)
  request["Authorization"] = "${this.key}"
  request["Content-Type"] = "application/json"
  request.body = "{\"name\": \"Mr. T. Rex\"}"

  response = https.request(request)
  puts response.read_body
    `;
    this.csharp = `
  var client = new RestClient("https://api.pdfasaurus.com/dino/TEMPLATE_ID");
  client.Timeout = -1;
  var request = new RestRequest(Method.POST);
  request.AddHeader("Authorization", "${this.key}");
  request.AddHeader("Content-Type", "application/json");
  request.AddParameter("application/json", "{\"name\": \"Mr. T. Rex\"}",  ParameterType.RequestBody);
  IRestResponse response = client.Execute(request);
  Console.WriteLine(response.Content);
    `;
    this.java = `
  OkHttpClient client = new OkHttpClient().newBuilder()
    .build();
  MediaType mediaType = MediaType.parse("application/json");
  RequestBody body = RequestBody.create(mediaType, "{\"name\": \"Mr. T. Rex\"}");
  Request request = new Request.Builder()
    .url("https://api.pdfasaurus.com/dino/TEMPLATE_ID")
    .method("POST", body)
    .addHeader("Authorization", "${this.key}")
    .addHeader("Content-Type", "application/json")
    .build();
  Response response = client.newCall(request).execute();
    `;
  this.smoke = `
        (  .      )
        )           (              )
              .  '   .   '  .  '  .
    (    , )       (.   )  (   ',    )
      .' ) ( . )    ,  ( ,     )   ( .
    ). , ( .   (  ) ( , ')  .' (  ,    )
    (_,) . ), ) _) _,')  (, ) '. )  ,. (' )
  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Be sure to relay your TEMPLATE_ID via carrier-terrordactyl beforehand.
    `
  }

  ngOnInit(): void {
    this.adminService
    .getApiKey(this.cookieService.getCookie(AUTH_COOKIE))
    .subscribe((res: any) => {
      this.key = res.apiKey;
      this.generateCode()
  }, (err) => {
    console.log(err)
    this.error = ERRORS.GENERIC;
  });
  }

  generateNewKey() {
    this.adminService
      .getNewApiKey(this.cookieService.getCookie(AUTH_COOKIE))
      .subscribe((res: any) => {
        this.key = res.newKey;
        this.generateCode();
    }, (err) => {
      console.log(err)
      this.error = ERRORS.GENERIC;
    });
  }

  copyToClipboard() {
    var input = document.createElement('input');
    input.setAttribute('value', this.key);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
  }
}
