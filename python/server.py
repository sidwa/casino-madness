import http.server;
import sys;
from custom_handler import CustomHandler;

DEFAULT_PORT = 1337;
VERBOSE = False; # Can be enabled by using "--verbose" flag
super_print=print; #assigning orignal print function to "super print", so I can override "print"

''' CLASSES '''
class ArgParser:
	
	def __init__(self,args):
		self.origin = args;
		self.flags = list();
		self.data = list();
		self.__set_flags();
		self.__set_data();
		return;
		
	def __set_flags(self):
		for part in self.origin:
			if "-" in part or "--" in part:
				self.flags.append(part.strip("-"));
				self.origin.remove(part);
		return;
	
	def __set_data(self):
		for part in self.origin:
			if "-" not in part or "--" not in part:
				self.data.append(part);
				self.origin.remove(part);
		return;
	
	def __str__(self):
		ret = str();
		ret += "DATA : "+str(self.data)+"\n";
		ret += "FLAGS: "+str(self.flags);
		return(ret);
		


''' FUNCTIONS '''
def error_message(message="unknown"):
	print(" :: ERROR :: "+message);

def print(message):
	if VERBOSE:
		super_print(message);

''' MAIN '''
if __name__ == "__main__":
	port = int();
	address = "";
	
	args = ArgParser(sys.argv[1:]);
	
	if "verbose" in args.flags:
		VERBOSE = True;
	
	if len(args.data) < 1:
		print("No arguments were passed! Using Default Port");
		port = DEFAULT_PORT;
	else:
		print("Using port "+str(args.data[0]));
		try:
			port = int(args.data[0]);
		except ValueError:
			error_message("Incompatible data for port number, please make sure that first argument is a number");
			exit();
	
	combo = (address,port);
	hs = http.server;
	handler = CustomHandler;
	http_daemon = hs.HTTPServer(combo,handler);
	
	try:
		print("Server has started...");
		http_daemon.serve_forever();
	except KeyboardInterrupt:
		print("Whoops, server killed by CTRL+C combo...");
		exit();
