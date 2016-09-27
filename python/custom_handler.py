import http.server as hs;
import json;

class CustomHandler(hs.BaseHTTPRequestHandler):

	def extract_json_data(self,url):
		url = url.strip("GET /?").strip(" HTTP/1.1").replace("%22","\"");
		print("Got : "+url);
		return(json.loads(url));

	def do_GET(self):
		self.send_response(200);
		self.send_header("content-type","text/JSON");
		self.send_header("content-encoding","ASCII")
		self.end_headers();

		data = self.extract_json_data(self.requestline); #returns JSON object

		res_json = dict();

		res_json["message"] = "Hello "+data["name"]; # Work on dresponse
		response = bytes(json.dumps(res_json),"ASCII")

		self.wfile.write(response);
		return;
