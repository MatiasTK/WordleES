import json

def mergeDic():
  dictionary_file = open('diccionario.json',encoding='utf-8')
  possible_words = open('palabras_5.json', encoding='utf-8')
  dictionary = json.load(dictionary_file)
  words = json.load(possible_words)

  # for word in words:
  #  if word not in dictionary:
  #    print(word)

  final_dict = list()
  for word in words:
    if word not in final_dict:
      final_dict.append(word)
  for word in dictionary:
    if word not in final_dict:
      final_dict.append(word)

  final_file = open('final_dictionary.json', 'w', encoding='utf-8')
  json.dump(final_dict,final_file,ensure_ascii=False)

  dictionary_file.close()
  possible_words.close()
  final_file.close()

mergeDic()