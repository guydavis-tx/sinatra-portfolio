require 'sinatra'
require 'dotenv'
require 'sendgrid-ruby'
include SendGrid

# note capital D
Dotenv.load

#root path
get '/' do
  erb :home
end

# project without layout
get '/clock' do
	erb :clock, layout:false
end

#need to create matching erb path in views folder
get '/contact-me' do
	erb :contact_me
end

# project without layout
get '/jukebox' do
	erb :jukebox, layout:false
end

#example using dotenv GEM to protect user ids/passwords
# requires gem install dotenv in folder before use
get '/dotenv' do
	"test: #{ENV['MY_PASSWORD']}"
end

# localhost:4567/test?color=blue  will pass a param that can be used by ruby
# look at gitbash console to see what parameters were passed
# just used underscore line to find console output quickly
get '/test' do
	puts ('___________')
	puts params.inspect
	"hello, #{params[:color]}"
end

# post page is called from contact-me page and passes form info
post '/send-email' do
	puts ('___________')
	# writes parameters passed from html form to terminal
	puts params.inspect
	# shows params on localhost:4567/send-mail page as return
	# params.inspect  -- commented out to allow for other return statement below
	
	# SendGrid ruby code below
	# User provides email to contact -- use as From
	from = Email.new(email: 'marketing@gexomedia.com')
	puts "From: #{from}"
	# Send information to me
	to = Email.new(email: 'guydavis.tx@gmail.com')
	puts "To: #{to}"
	subject = 'User sent contact info'
	puts "Subject: #{subject}"
	user_info = "User Name: #{params[:name]};<br>User Email: #{params[:email]}; <br>#{params[:thoughts]}"
	puts user_info
	content = Content.new(type: 'text/html', value: user_info)
	puts "Content: #{content}"
	mail = Mail.new(from, subject, to, content)
	puts "Mail: #{mail}"

	sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
	puts "sg: #{sg}"
	response = sg.client.mail._('send').post(request_body: mail.to_json)
	puts "Response: #{response}"
	puts response.status_code
	puts response.body
	puts response.headers
	"Email from: #{params[:email]}"

end

get '/send-email' do
	puts ('___________')
	puts params.inspect
	ENV["SENDGRID_API_KEY"]

end

get '/:id' do
	@id = params[:id].capitalize
	erb :id
end



