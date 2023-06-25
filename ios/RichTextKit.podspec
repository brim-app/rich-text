Pod::Spec.new do |s|
  spec.name = "RichTextKit"
  spec.version = "0.7.2"
  spec.authors = ""
  spec.summary = "RichTextKit is a library for building rich text editors in React Native."
  spec.homepage = "https://github.com/danielsaidi/RichTextKit"
  spec.platform = :ios, "14.0"
  spec.source = {
    :git => "https://github.com/danielsaidi/RichTextKit.git", :tag => "#{spec.version}"
  }
  spec.source_files  = "RichTextKit/Sources/**/*.{h,m,swift}"
end
